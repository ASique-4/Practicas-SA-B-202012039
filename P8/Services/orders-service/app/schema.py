import strawberry
from typing import List
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from app.models import Order

engine = create_engine("sqlite:///database.db")
SessionLocal = sessionmaker(bind=engine)

def to_order_type(order_obj):
    return OrderType(
        id=order_obj.id,
        user_id=order_obj.user_id,
        product_name=order_obj.product_name,
        quantity=order_obj.quantity
    )


@strawberry.type
class OrderType:
    id: int
    user_id: int
    product_name: str
    quantity: int

@strawberry.type
class Query:
    @strawberry.field
    def orders(self) -> List[OrderType]:
        session = SessionLocal()
        orders = session.query(Order).all()
        session.close()
        return [to_order_type(o) for o in orders]

@strawberry.type
class Mutation:
    @strawberry.mutation
    def create_order(self, user_id: int, product_name: str, quantity: int) -> OrderType:
        session = SessionLocal()
        new_order = Order(user_id=user_id, product_name=product_name, quantity=quantity)
        session.add(new_order)
        session.commit()
        session.refresh(new_order)
        session.close()
        return to_order_type(new_order)

schema = strawberry.Schema(query=Query, mutation=Mutation)
