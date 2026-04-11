from fastapi import APIRouter, Depends, Request
from sqlalchemy.orm import Session

from data_access.database import get_db
from data_access.models.user import User
from schemas.user import UserCreate, UserLogin, UserOut
from services.auth import get_current_user, login_user, signup_user

router = APIRouter(prefix="/auth", tags=["auth"])


@router.post("/signup", response_model=UserOut)
def signup(body: UserCreate, request: Request, db: Session = Depends(get_db)):
    user = signup_user(body, db)
    request.session["user_id"] = user.id
    return user


@router.post("/login", response_model=UserOut)
def login(body: UserLogin, request: Request, db: Session = Depends(get_db)):
    user = login_user(body, db)
    request.session["user_id"] = user.id
    return user


@router.post("/logout")
def logout(request: Request):
    request.session.clear()
    return {"detail": "Logged out"}


@router.get("/me", response_model=UserOut)
def me(current_user: User = Depends(get_current_user)):
    return current_user
