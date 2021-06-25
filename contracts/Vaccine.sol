pragma solidity >=0.4.22 <0.8.0;

contract Vaccine {
   event initialised (string Name);
   event recorded (int BatchNo , int temp);
   event registered (string name_ , int min_ , int max_);

   mapping(int => _VaccineType) public VaccineType;   //maps to type of vaccine
   struct _VaccineType{
      string name;
      int VaccineID;   // each VaccineID corresponds to a different Vaccine's name
      int min;
      int max;
      int QtyOrd;
      int qty;
    }

    mapping(int => _VaccineBatch) public VaccineBatch;   //maps to a batch of vaccine
    struct _VaccineBatch{
       int VaccineID;
       int BatchNo;
       int count;      // no of times temp was recorded
       bool life;
       int[] TempData;
       int[] Seconds;
    }

    struct _order{
      int VaccineID;
      int first;
      int qty;
    }

    _order[] public ohistory;
    int public o=0;   //Total number of orders
    int public i=0;   //Total registered vaccines
    int public j=0;   //Total Qty Ordered, helps in giving different BatchID

function initialise() public{
_VaccineType memory v1;
v1=_VaccineType("AstraZeneca/Oxford COVID-19 vaccine",1,2,8,0,10);
VaccineType[++i]=v1;
emit initialised(v1.name);
}

function register(string memory name_ , int min_ , int max_ , int qty_ ) public{
      _VaccineType memory v;
      v=_VaccineType(name_,++i,min_,max_,0,qty_);
      VaccineType[i]=v;
      emit registered(name_ , min_ , max_);
   }

function addQty(int ID, int qty_) public{
      if(ID>i)
      revert("Enter valid ID");
      VaccineType[ID].qty+=qty_;
}

function order(int ID ,int oqty) public returns(bool){
if(ID > i)
revert("Enter valid Vaccine ID.");
if(VaccineType[ID].qty<oqty)
revert("Please enter quantity <= available quantity");
 for(int l=0;l<oqty;l++){
   int[] memory arr1=new int[](0);
   int[] memory arr2=new int[](0);
   VaccineBatch[l+j+1]=_VaccineBatch(ID,j+l+1,0,true,arr1,arr2);
 }
 VaccineType[ID].QtyOrd+=oqty;
 VaccineType[ID].qty-=oqty;
 ohistory.push(_order(ID,j+1,oqty));
 o++;
 j+=oqty;
 return true;
}

function setTemp(int BatchNo , int temp , int Seconds ) public{
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

function getTemp(int BatchNo) public view returns (int[] memory , int[] memory){
    if(BatchNo > j)
     revert("Enter valid Batch Number.");
    return (VaccineBatch[BatchNo].TempData,VaccineBatch[BatchNo].Seconds);
  }


}
