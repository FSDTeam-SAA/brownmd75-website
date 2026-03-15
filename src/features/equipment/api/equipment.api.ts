// src/features/equipment/api/equipment.api.ts

import axiosInstance from "@/lib/instance/axios-instance";

// get all equipment
export const getEquipment = async () => {
  const res = await axiosInstance.get("/equipments/all");
  return res.data;
};

// get single equipment by id
export const getEquipmentById = async (id: string) => {
  const res = await axiosInstance.get(`/equipments/${id}`);
  return res.data;
};
