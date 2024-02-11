export enum Posisi {
  Developer = "Developer",
  Kordinator = "Koordinator",
  Pengawas = "Pengawas",
}
export enum Kelas {
  X = "X",
  XI = "XI",
  XII = "XII",
}
export enum Jurusan {
  TKR = "TKR",
  TMI = "TMI",
  RPL = "RPL",
  Kuliner = "Kuliner",
}

export type Admin = {
  isAdmin?: boolean | null;
  nama?: string | null;
  posisi?: Posisi | null;
};

export type Voter = {
  isVoter?: boolean | null;
  nis?: number | null;
  nama?: string | null;
  kelas?: Kelas | null;
  jurusan?: Jurusan | null;
  candidateId?: number | null;
};
