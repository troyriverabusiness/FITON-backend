from fastapi import APIRouter

router = APIRouter()

# Get feed of policies/laws
@router.get("/feed")
def get_feed():
    return {"status": "ok"}


# Get effects of a topic (policy/discussion) for a specific user
@router.get("/effects/{topic_id}/{user_id}")
def get_effects(topic_id: str, user_id: str) -> list[dict]:
    return []


# Onboard a user
@router.post("/user")
def create_user(user: str):
    return {"status": "ok"}