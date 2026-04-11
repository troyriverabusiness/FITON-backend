from fastapi import APIRouter

router = APIRouter()

# Get feed of policies/laws
@router.get("/feed")
def get_feed():
    return {"status": "ok"}


# Get effects of policy (for a user)
@router.get("/effects/{user_id}")
def get_effects(user_id: str):
    return {"status": "ok"}


# Onboard a user
@router.post("/user")
def create_user(user: str):
    return {"status": "ok"}