import { useRouter } from "next/router";
import useIdStore from "~/Store/useid";
import { api } from "~/utils/api";
import { useRef } from "react";
import html2canvas from 'html2canvas';
import jsPDF from "jspdf";
import { AiOutlineDownload } from 'react-icons/ai';
const Will = () => {
    const set = useIdStore();
    const router = useRouter();
    const {will}=router.query;
    const contentRef = useRef(null);
    const { data: bank, error: bankErr } = api.will.bankAccount.useQuery(set.willId);
    const { data: mf, error: mfErr } = api.will.mutualFund.useQuery(set.willId);
    const { data: fd, error: fdErr } = api.will.fixedDeposit.useQuery(set.willId);
    const { data: locker, error: lockerErr } = api.will.lockers.useQuery(set.willId);
    const { data: ppf, error: ppfErr } = api.will.ppf.useQuery(set.willId);
    const { data: share, error: shareErr } = api.will.shares.useQuery(set.willId);
    const { data: property, error: propertyErr } = api.will.property.useQuery(set.willId);

    if (bankErr || mfErr || fdErr || lockerErr || ppfErr || shareErr || propertyErr) {
        router.reload();
    }

    if (!bank || !mf || !fd || !locker || !ppf || !share || !property) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="text-center">Loading...</div>
            </div>
        );
    }
    const generatePDF = async () => {
        try {
            const content = contentRef.current; // Get reference to the content

            if (content) {
                const canvas = await html2canvas(content); // Convert content to canvas
                const contentAsImage = canvas.toDataURL('image/png');

                const doc = new jsPDF();
                const componentWidth = doc.internal.pageSize.getWidth();
                const componentHeight = doc.internal.pageSize.getHeight();
                doc.addImage(contentAsImage, 'PNG', 0, 0, componentWidth, componentHeight);
                doc.save(`${will}.pdf`);
            }
        } catch (error) {
            console.error('Error generating PDF:', error);
        }
    };


    return (
        <div className="max-w-4xl mx-auto p-4 border border-gray-300 border-md m-4 relative">
        <div className="absolute top-0 right-2 text-black cursor-pointer p-3">
          <AiOutlineDownload size={24} onClick={generatePDF} />
        </div>
            <div className="max-w-4xl mx-auto p-4 border border-gray-300 border-md m-5" ref={contentRef}>
        <h1 className="text-3xl font-bold mb-6">YOUR WILL</h1>
        
        <div className="border border-yellow-500 p-4 rounded-md mb-6">
            <h2 className="text-xl font-bold mb-4">Bank Details</h2>
            <div>
                <p className="mb-2"><span className="font-bold">Bank Name:</span> {bank.bankName}</p>
                <p className="mb-2"><span className="font-bold">Branch:</span> {bank.branch}</p>
                <p className="mb-2"><span className="font-bold">Account Type:</span> {bank.type}</p>
                <p className="mb-2"><span className="font-bold">Nominee:</span> {bank.nominee}</p>
            </div>
        </div>
        <div className="border border-yellow-500 p-4 rounded-md mb-6">
            <h2 className="text-xl font-bold mb-4">MUTUAL FUND</h2>
            <div>
                <p className="mb-2"><span className="font-bold">FOLIO NO:</span> {mf.folioNo}</p>
                <p className="mb-2"><span className="font-bold">Mutual Fund Name:</span> {mf.name}</p>
                <p className="mb-2"><span className="font-bold">Applicant:</span> {mf.applicant}</p>
                <p className="mb-2"><span className="font-bold">Nominee:</span> {mf.nominee}</p>
            </div>
        </div>
        <div className="border border-yellow-500 p-4 rounded-md mb-6">
            <h2 className="text-xl font-bold mb-4">Fixed Deposit</h2>
            <div>
                <p className="mb-2"><span className="font-bold">Company Name:</span> {fd.companyName}</p>
                <p className="mb-2"><span className="font-bold">Amount:</span> {fd.amount}</p>
                <p className="mb-2"><span className="font-bold">Maturity Date:</span> {fd.maturitydate}</p>
                <p className="mb-2"><span className="font-bold">Nominee:</span> {fd.nominee}</p>
            </div>
        </div>
        <div className="border border-yellow-500 p-4 rounded-md mb-6">
            <h2 className="text-xl font-bold mb-4">Lockers</h2>
            <div>
                <p className="mb-2"><span className="font-bold">Bank Name:</span> {locker.bankname}</p>
                <p className="mb-2"><span className="font-bold">Branch:</span> {locker.branch}</p>
                <p className="mb-2"><span className="font-bold">Account No:</span> {locker.accno}</p>
                <p className="mb-2"><span className="font-bold">Rent:</span> {locker.rent}</p>
                <p className="mb-2"><span className="font-bold">Nominee:</span> {fd.nominee}</p>
            </div>
        </div>
        <div className="border border-yellow-500 p-4 rounded-md mb-6">
            <h2 className="text-xl font-bold mb-4">PPF</h2>
            <div>
                <p className="mb-2"><span className="font-bold">Bank Name:</span> {ppf.bankname}</p>
                <p className="mb-2"><span className="font-bold">Account No:</span> {ppf.accno}</p>
                <p className="mb-2"><span className="font-bold">Maturity Date:</span> {ppf.maturityDate}</p>
                <p className="mb-2"><span className="font-bold">Nominee:</span> {ppf.nominee}</p>
            </div>
        </div>
        <div className="border border-yellow-500 p-4 rounded-md mb-6">
            <h2 className="text-xl font-bold mb-4">SHARES</h2>
            <div>
                <p className="mb-2"><span className="font-bold">Company:</span> {share.company}</p>
                <p className="mb-2"><span className="font-bold">Quantity:</span> {share.quantity}</p>
                <p className="mb-2"><span className="font-bold">Demat Account:</span> {share.dematAc}</p>
                <p className="mb-2"><span className="font-bold">Nominee:</span> {share.nominee}</p>
            </div>
        </div>
        <div className="border border-yellow-500 p-4 rounded-md mb-6">
            <h2 className="text-xl font-bold mb-4">PROPERTY</h2>
            <div>
                <p className="mb-2"><span className="font-bold">Address:</span> {property.address}</p>
                <p className="mb-2"><span className="font-bold">Area:</span> {property.area}</p>
                <p className="mb-2"><span className="font-bold">City:</span> {property.city}</p>
                <p className="mb-2"><span className="font-bold">State:</span> {property.state}</p>
                <p className="mb-2"><span className="font-bold">Pincode:</span> {property.pincode}</p>
                <p className="mb-2"><span className="font-bold">Country:</span> {property.country}</p>
            </div>
        </div>
    </div></div>

    );
};

export default Will;
