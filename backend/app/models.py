from sqlalchemy import Column, DateTime, ForeignKey, Integer, Text
from sqlalchemy.orm import relationship

from .database import Base


class Category(Base):
    __tablename__ = "categories"

    id = Column(Integer, primary_key=True)
    name = Column(Text, nullable=False)
    created_at = Column(DateTime(timezone=True), nullable=False)


class Product(Base):
    __tablename__ = "products"

    id = Column(Integer, primary_key=True)
    name = Column(Text, nullable=False)
    description = Column(Text)
    price = Column(Integer, nullable=False)
    category_id = Column(Integer, ForeignKey("categories.id"), nullable=False)
    image_url = Column(Text)
    created_at = Column(DateTime(timezone=True), nullable=False)

    category = relationship("Category")
