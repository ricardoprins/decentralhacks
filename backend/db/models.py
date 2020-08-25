from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
from .database import Base

class Voter(Base):
    __tablename__ = 'voters'

    id = Column(Integer, primary_key=True)
    nid = Column(Integer, unique=True)
    hashed_password = Column(String)
    vote = Column(Integer)


class Candidate(Base):
    __tablename__ = 'candidates'

    id = Column(Integer, primary_key=True)
    name = Column(String, unique=True)