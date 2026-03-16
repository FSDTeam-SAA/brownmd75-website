// src/features/equipment/hooks/useEquipment.ts

import { useQuery } from "@tanstack/react-query";
import { getEquipment, getEquipmentById } from "../api/equipment.api";

//  Get All Equipment
export const useEquipment = () => {
  return useQuery({
    queryKey: ["equipment"],
    queryFn: () => getEquipment(),
  });
};

// Get Single Equipment by ID
export const useEquipmentById = (id: string) => {
  return useQuery({
    queryKey: ["equipment", id],
    queryFn: () => getEquipmentById(id),
    enabled: !!id,
  });
};
