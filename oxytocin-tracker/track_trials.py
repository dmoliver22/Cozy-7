#!/usr/bin/env python3
"""Pull oxytocin trials from the ClinicalTrials.gov v2 API and diff against the last snapshot.

Usage:
    python3 track_trials.py            # fetch, diff against snapshots/latest.json, write new snapshot
    python3 track_trials.py --dry-run  # fetch and diff only

Needs outbound HTTPS to clinicaltrials.gov (blocked in the cloud session that wrote this; run it
locally or allow the domain in the environment's network settings). Standard library only.
"""
import argparse, datetime as dt, json, os, sys, urllib.parse, urllib.request

API = "https://clinicaltrials.gov/api/v2/studies"
FIELDS = ",".join([
    "NCTId", "BriefTitle", "OverallStatus", "Phase", "StudyFirstPostDate", "LastUpdatePostDate",
    "Condition", "InterventionName", "EnrollmentCount", "LeadSponsorName", "PrimaryCompletionDate",
    "StudyType", "ResultsFirstPostDate",
])
HERE = os.path.dirname(os.path.abspath(__file__))
SNAP_DIR = os.path.join(HERE, "snapshots")
LATEST = os.path.join(SNAP_DIR, "latest.json")

# Statuses worth flagging when they change.
WATCH_STATUSES = {"RECRUITING", "NOT_YET_RECRUITING", "ACTIVE_NOT_RECRUITING", "COMPLETED", "TERMINATED", "WITHDRAWN"}


def fetch_all(query_intr="oxytocin"):
    studies, token = [], None
    while True:
        params = {"query.intr": query_intr, "fields": FIELDS, "pageSize": 1000, "format": "json",
                  "sort": "LastUpdatePostDate:desc"}
        if token:
            params["pageToken"] = token
        url = API + "?" + urllib.parse.urlencode(params)
        with urllib.request.urlopen(url, timeout=60) as r:
            data = json.load(r)
        studies.extend(data.get("studies", []))
        token = data.get("nextPageToken")
        if not token:
            return studies


def flatten(s):
    p = s["protocolSection"]
    i, st = p["identificationModule"], p["statusModule"]
    de, c = p.get("designModule", {}), p.get("conditionsModule", {})
    sp, ai = p.get("sponsorCollaboratorsModule", {}), p.get("armsInterventionsModule", {})
    return {
        "nct": i["nctId"],
        "title": i.get("briefTitle", ""),
        "status": st.get("overallStatus", ""),
        "phase": ",".join(de.get("phases", [])),
        "first_posted": st.get("studyFirstPostDateStruct", {}).get("date", ""),
        "last_update": st.get("lastUpdatePostDateStruct", {}).get("date", ""),
        "results_posted": st.get("resultsFirstPostDateStruct", {}).get("date", ""),
        "primary_completion": st.get("primaryCompletionDateStruct", {}).get("date", ""),
        "enrollment": de.get("enrollmentInfo", {}).get("count", ""),
        "sponsor": sp.get("leadSponsor", {}).get("name", ""),
        "conditions": "; ".join(c.get("conditions", [])),
        "interventions": "; ".join(x.get("name", "") for x in ai.get("interventions", [])),
    }


def diff(old, new):
    old_by, new_by = {x["nct"]: x for x in old}, {x["nct"]: x for x in new}
    added = [new_by[k] for k in new_by if k not in old_by]
    changes = []
    for k in new_by:
        if k in old_by:
            o, n = old_by[k], new_by[k]
            fields = [f for f in ("status", "results_posted", "primary_completion", "enrollment", "phase") if o.get(f) != n.get(f)]
            if fields:
                changes.append((n, {f: (o.get(f), n.get(f)) for f in fields}))
    return added, changes


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--dry-run", action="store_true")
    args = ap.parse_args()

    new = [flatten(s) for s in fetch_all()]
    old = []
    if os.path.exists(LATEST):
        with open(LATEST) as f:
            old = json.load(f)["studies"]

    added, changes = diff(old, new)
    today = dt.date.today().isoformat()
    print(f"# Oxytocin trial check {today}: {len(new)} studies total, {len(added)} new, {len(changes)} changed\n")
    for a in sorted(added, key=lambda x: x["first_posted"], reverse=True):
        print(f"NEW  {a['nct']}  {a['first_posted']}  {a['status']:<22} {a['sponsor'][:40]:<40} {a['title'][:90]}")
    for n, ch in changes:
        desc = "; ".join(f"{f}: {o!r} -> {v!r}" for f, (o, v) in ch.items())
        print(f"CHG  {n['nct']}  {n['last_update']}  {n['title'][:70]}  [{desc}]")

    if not args.dry_run:
        os.makedirs(SNAP_DIR, exist_ok=True)
        payload = {"pulled": today, "studies": new}
        with open(os.path.join(SNAP_DIR, f"{today}.json"), "w") as f:
            json.dump(payload, f, indent=1)
        with open(LATEST, "w") as f:
            json.dump(payload, f, indent=1)
        print(f"\nSnapshot written to snapshots/{today}.json and snapshots/latest.json")


if __name__ == "__main__":
    try:
        main()
    except Exception as e:  # noqa: BLE001
        print(f"error: {e}", file=sys.stderr)
        sys.exit(1)
