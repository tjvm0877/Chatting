import { create } from 'zustand';
import { Member as Member } from '../types/Member';

interface MemberState {
  member: Member | null;
  setMember: (user: Member | null) => void;
  clearUser: () => void;
}

export const useMemberStore = create<MemberState>((set) => ({
  member: null,
  setMember: (member) => set({ member: member }),
  clearUser: () => set({ member: null }),
}));
