pragma solidity >=0.4.22 <0.8.0;

contract Vaccine {
   event initialised (string Name);
   event recorded (uint BatchNo , uint temp);
   event registered (string name_ , uint min_ , uint max_);

   mapping(uint => _VaccineType) public VaccineType;   //maps to type of vaccine
   struct _VaccineType{
      string name;
      uint VaccineID;   // each VaccineID corresponds to a different Vaccine's name
      uint min;
      uint max;
      uint QtyOrd;
      uint qty;
    }

    mapping(uint => _VaccineBatch) public VaccineBatch;   //maps to a batch of vaccine
    struct _VaccineBatch{
       uint VaccineID;
       uint BatchNo;
       uint count;      // no of times temp was recorded
       bool life;
       uint[] TempData;
       uint[] Seconds;
    }
    uint public i=0;   //Total registered vaccines
    uint public j=0;   //Total Qty Ordered, helps in giving different BatchID

function initialise() public{
_VaccineType memory v1;
v1=_VaccineType("AstraZeneca/Oxford COVID-19 vaccine",1,2,8,0,10);
VaccineType[++i]=v1;
emit initialised(v1.name);
}

function register(string memory name_ , uint min_ , uint max_ , uint qty_ ) public{
      _VaccineType memory v;
      v=_VaccineType(name_,++i,min_,max_,0,qty_);
      VaccineType[i]=v;
      emit registered(name_ , min_ , max_);
   }

function addQty(uint ID, uint qty_) public{
      if(ID>i)
      revert("Enter valid ID");
      VaccineType[ID].qty+=qty_;
}

function order(uint ID ,uint oqty) public{
if(ID > i)
revert("Enter valid Vaccine ID.");
if(VaccineType[ID].qty<oqty)
revert("Please enter quantity <= available quantity");
 for(uint l=0;l<oqty;l++){
   uint[] memory arr=new uint[](0);
   VaccineBatch[l+j+1]=_VaccineBatch(ID,j+l+1,0,true,arr,arr);
 }
 VaccineType[ID].QtyOrd+=oqty;
 VaccineType[ID].qty-=oqty;
 j+=oqty;
}

function setTemp(uint BatchNo , uint temp , uint Seconds ) public{
     if(BatchNo > j)
     revert("Enter valid Batch Number.");
//   if(VaccineBatch[BatchNo].life==false)
//   revert("Vaccine Batch has expired.");
     (VaccineBatch[BatchNo].TempData).push(temp);
     (VaccineBatch[BatchNo].Seconds).push(Seconds);
      VaccineBatch[BatchNo].count+=1;
     bool state;
     if(temp>VaccineType[VaccineBatch[BatchNo].VaccineID].max || temp<VaccineType[VaccineBatch[BatchNo].VaccineID].min){
       state=false;
     }
     else state=true;
     VaccineBatch[BatchNo].life=VaccineBatch[BatchNo].life&&state;
     emit recorded(BatchNo, temp);
  }

function getTemp(uint BatchNo) public view returns (uint[] memory , uint[] memory){
    if(BatchNo > j)
     revert("Enter valid Batch Number.");
    return (VaccineBatch[BatchNo].TempData,VaccineBatch[BatchNo].Seconds);
  }


}
