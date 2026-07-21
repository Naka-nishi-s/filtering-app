from datetime import datetime
from typing import Optional

from pydantic import BaseModel, ConfigDict


class CategoryOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    name: str
    created_at: datetime


class ProductOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    name: str
    description: Optional[str] = None
    price: int
    category_id: int
    category_name: Optional[str] = None
    image_url: Optional[str] = None
    created_at: datetime
