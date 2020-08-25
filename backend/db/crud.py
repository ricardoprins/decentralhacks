from sqlalchemy.orm import Session
from . import models, schemas


def createVoter(db: Session, voter: schemas.VoterCreate):
    hashedPassword = hash(voter.password)
    db_voter = models.Voter(nid = voter.nid, hashed_password = hashedPassword, vote = voter.vote)
    db.add(db_voter)
    db.commit()
    db.refresh(db_voter)
    return db_voter


def createCandidate(db: Session, candidate: schemas.CandidateCreate):
    db_candidate = models.Candidate(name = candidate.name)
    db.add(db_candidate)
    db.commit()
    db.refresh(db_candidate)
    return db_candidate


def getVoterByNID(db: Session, voterNID: int):
    return db.query(models.Voter).filter(models.Voter.nid == voterNID).first()

def addVote(db: Session, voterNID: int, vote: int):
    db_voter = getVoterByNID(db, voterNID)
    db_voter.vote = vote
    db.commit()


    
    