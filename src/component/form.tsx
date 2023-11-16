import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { api } from '~/utils/api';
import { useRouter } from 'next/router';
import useIdStore from '~/Store/useid';
interface FormProps {
  title: string;
  props: string[];
}

const Form: React.FC<FormProps> = ({ title, props }) => {
  const [formData, setFormData] = useState<{ [key: string]: string }>({});
  const set=useIdStore();
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };
  const router=useRouter();
  const {mutate:bank}=api.bankAccount.Create.useMutation({
    onError:(error)=>{
        toast.error(error.message);
        setFormData({})
        router.reload()
    },
    onSettled:(data)=>{
        if(data){
        toast.success("Bank Information successfully added");
        router.push('/will/fixedDeposit')
        set.setBankAccountId(data)
        }
    }
  });
  const {mutate:fd}=api.FixedDeposit.Create.useMutation({
    onError:(error)=>{
      toast.error(error.message);
      setFormData({})
      router.reload()
  },
  onSettled:(data)=>{
      if(data){
      toast.success("fixed deposit details successfully added");
      router.push('/will/mutualFund')
      set.setFixedDepositId(data);
      }
  }
  });
  const {mutate:mf}=api.MutualFund.Create.useMutation({
    onError:(error)=>{
      toast.error(error.message);
      setFormData({})
      router.reload()
  },
  onSettled:(data)=>{
      if(data){
      toast.success("Mutual fund details successfully added");
      router.push('/will/lockers')
      set.setMutualFundId(data);
      }
  }
  });
  const {mutate:lockers}=api.Lockers.Create.useMutation({
    onError:(error)=>{
      toast.error(error.message);
      setFormData({})
      router.reload()
  },
  onSettled:(data)=>{
      if(data){
      toast.success("Locker details successfully added");
      router.push('/will/ppf')
      set.setLockersId(data);
      }
  }
  });
  const {mutate:ppf}=api.PPF.Create.useMutation({
    onError:(error)=>{
      toast.error(error.message);
      setFormData({})
      router.reload()
  },
  onSettled:(data)=>{
      if(data){
      toast.success("PPF details successfully added");
      router.push('/will/shares')
      set.setPPFId(data);
      }
  }
  });
  const {mutate:shares}=api.Shares.Create.useMutation({
    onError:(error)=>{
      toast.error(error.message);
      setFormData({})
      router.reload()
  },
  onSettled:(data)=>{
      if(data){
      toast.success("Company Shares details successfully added");
      router.push('/will/property')
      set.setsharesId(data);
      }
  }
  });
  const {mutate:property}=api.Property.Create.useMutation({
    onError:(error)=>{
      toast.error(error.message);
      setFormData({})
      router.reload()
  },
  onSettled:()=>{
      toast.success("Property details successfully added");
      router.push('/main');
      
    }
  })
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if(title==="Bank Information"){
        const {BankName,Branch,Type,Nominee}=formData;
        if(!BankName||!Branch||!Type||!Nominee){
            return null;
        }
        const bankAccount ={
            bankName: BankName,
            branch: Branch,
            type:Type,
            nominee: Nominee,
        }

        bank(bankAccount);
    }
    else if(title==="Fixed Deposit Details"){
      const {Company,Amount,MaturityDate,Nominee}=formData;
      if(!Company||!Amount||!MaturityDate||!Nominee){
        return null;
      }
      const FixedDeposit={
        companyName:Company,
        amount:Amount,
        maturitydate:MaturityDate,
        nominee:Nominee,
      }
      fd(FixedDeposit)
    }
    else if(title==="Mutual Funds Details"){
      const {FolioNo,Applicant,Amount,MfName,Nominee}=formData;
      if(!FolioNo||!Applicant||!Amount||!MfName||!Nominee){
        return null;
      }
      const MutualFund={
        folioNo   :FolioNo,
        name      :MfName,
        applicant :Applicant,
        nominee   :Nominee,
      }
      mf(MutualFund);
    }
    else if(title==="Locker Details"){
      const {        BankName,
      Branch,
      AccNo,
      rent,
      Nominee}=formData;
      if(!BankName||!Branch||!AccNo||!rent||!Nominee){
        return null;
      }
      const Lockers={
        bankname: BankName,
        branch: Branch,
        accno: AccNo,
        rent: rent,
        nominee: Nominee,
      }
      lockers(Lockers);
    }
    else if(title==="Ppf Details"){
      const {BankName,AccNo,MaturityDate,Nominee}=formData;
      if(!BankName||!AccNo||!MaturityDate||!Nominee){
        return null;
      }
      const PPF={
        bankname: BankName,
    accno: AccNo,
    maturityDate: MaturityDate,
    nominee: Nominee,
      }
      ppf(PPF);
    }
    else if(title==="Company Shares"){
      const {DematAccount,Company,Quantity,Nominee}=formData;
      if(!DematAccount||!Company||!Quantity||!Nominee){
        return null;
      }
      const Shares={
        company: Company,
        quantity: Quantity,
        dematAc: DematAccount,
        nominee: Nominee,
      }
      shares(Shares);
    }
    else if (title === "Property Details") {
      const { Address, "Areain(sqft)": Area, Pincode, city, State, Country } = formData;
      if (!Address || !Area || !Pincode || !city || !State || !Country) {
        return null;
      }
      const PropertyDetails = {
        address: Address,
        area: Area,
        pincode: Pincode,
        city: city,
        state: State,
        country: Country
      };
      const Ids={
        BankId:set.bankAccountid,
        FixedDepositId:set.fixedDepositId,
        MutualFundId:set.mutualFundId,
        LockerId:set.lockersId,
        PPFId:set.ppfId,
        SharesId:set.sharesId,
      }
      const input={
        propertySchema:PropertyDetails,
        Ids
      }
      property(input);
    }
  };
  return (
    <div className="bg-gradient-to-r from-yellow-400 to-yellow-600 min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded shadow-md w-full md:w-2/3 lg:w-1/2">
        <h1 className="text-2xl font-semibold mb-4 text-center">{title}</h1>
        <form onSubmit={handleSubmit}>
          {props.map((item) => (
            <div className="mb-4" key={item}>
              <label htmlFor={item} className="block font-medium text-gray-700">
                {item}:
              </label>
              <input
                type="text"
                id={item}
                name={item}
                value={formData[item] || ''}
                onChange={handleInputChange}
                required
                className="w-full p-2 border rounded"
              />
            </div>
          ))}
          <button type="submit" className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 w-full">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Form;