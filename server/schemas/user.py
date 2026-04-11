from datetime import datetime

from pydantic import BaseModel


class UserCreate(BaseModel):
    email: str
    password: str


class UserLogin(BaseModel):
    email: str
    password: str


class UserOut(BaseModel):
    id: int
    email: str
    created_at: datetime
    profile_text: str | None = None

    model_config = {"from_attributes": True}


class UserProfileUpdate(BaseModel):
    profile_text: str
