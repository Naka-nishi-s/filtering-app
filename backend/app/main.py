from typing import List, Optional

from fastapi import Depends, FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session

from . import models, schemas
from .database import get_db

app = FastAPI(title="filtering-app API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)


def to_product_out(product: models.Product) -> schemas.ProductOut:
    return schemas.ProductOut(
        id=product.id,
        name=product.name,
        description=product.description,
        price=product.price,
        category_id=product.category_id,
        category_name=product.category.name if product.category else None,
        image_url=product.image_url,
        created_at=product.created_at,
    )


@app.get("/api/health")
def health():
    return {"status": "ok"}


@app.get("/api/categories", response_model=List[schemas.CategoryOut])
def list_categories(db: Session = Depends(get_db)):
    return db.query(models.Category).order_by(models.Category.id).all()


@app.get("/api/products", response_model=List[schemas.ProductOut])
def list_products(category_id: Optional[int] = None, db: Session = Depends(get_db)):
    query = db.query(models.Product)
    if category_id is not None:
        query = query.filter(models.Product.category_id == category_id)
    products = query.order_by(models.Product.id).all()
    return [to_product_out(p) for p in products]


@app.get("/api/products/{product_id}", response_model=schemas.ProductOut)
def get_product(product_id: int, db: Session = Depends(get_db)):
    product = db.query(models.Product).filter(models.Product.id == product_id).first()
    if product is None:
        raise HTTPException(status_code=404, detail="Product not found")
    return to_product_out(product)
