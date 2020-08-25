from pydantic import BaseModel
from typing import Optional


class VoterBase(BaseModel):
    nid: int
    

class VoterCreate(VoterBase):
    vote: Optional(int)
    password: str


class Voter(VoterBase):
    id: int

    class Config:
        orm_mode = True


class VoterUpdate(Voter):
    vote: int


class CandidateBase(BaseModel):
    name: str


class CandidateCreate(CandidateBase):
    pass


class Candidate(CandidateBase):
    id: int

    class Config:
        orm_mode = True