import { create } from "zustand";

type States = {
    bankAccountid: string;
    fixedDepositId: string;
    mutualFundId: string;
    lockersId: string;
    ppfId: string;
    sharesId: string;
    willId: string;
}

type Actions = {
    setBankAccountId: (id: string) => void;
    setFixedDepositId: (id: string) => void;
    setMutualFundId: (id: string) => void;
    setLockersId: (id: string) => void;
    setPPFId: (id: string) => void;
    setsharesId: (id: string) => void;
    setWillId: (id: string) => void;
}

const useIdStore = create<States & Actions>((set) => ({
    bankAccountid: "",
    fixedDepositId: "",
    mutualFundId: "",
    lockersId: "",
    ppfId: "",
    sharesId: "",
    willId: "",

    setBankAccountId: (id: string) => set(() => ({ bankAccountid: id })),
    setFixedDepositId: (id: string) => set(() => ({ fixedDepositId: id })),
    setMutualFundId: (id: string) => set(() => ({ mutualFundId: id })),
    setLockersId: (id: string) => set(() => ({ lockersId: id })),
    setPPFId: (id: string) => set(() => ({ ppfId: id })),
    setsharesId: (id: string) => set(() => ({ sharesId: id })),
    setWillId: (id: string) => set(() => ({ willId: id })),
}))

export default useIdStore;