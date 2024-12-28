from pydantic import BaseModel
from typing import List, Optional

class ContractCompanyBase(BaseModel):
    company_name: str
    address: Optional[str] = None
    contact_person: Optional[str] = None
    contact_email: Optional[str] = None
    extra_metadata: Optional[dict] = None

class ContractCompanyCreate(ContractCompanyBase):
    pass

class ContractCompany(ContractCompanyBase):
    id: int

    class Config:
        orm_mode: True
        from_attributes = True

class ContractCompanyListResponse(BaseModel):
    data: List[ContractCompany]
    total: int
    skip: int
    limit: int