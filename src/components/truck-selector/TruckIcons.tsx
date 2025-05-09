
import React from "react";
import { 
  Snowflake,
  Droplets,
  Shovel,
  Construction,
  Truck,
  Forklift,
  HardHat,
  Wrench,
  Hammer
} from "lucide-react";

interface IconProps {
  className?: string;
}

export const TruckIcons = {
  renderRefrigeratedIcon: () => (
    <div className="p-2 rounded-full bg-blue-100 flex items-center justify-center">
      <Snowflake className="h-9 w-9 text-blue-500" />
    </div>
  ),
  
  renderJCPIcon: () => (
    <div className="p-2 rounded-full bg-yellow-100 flex items-center justify-center">
      <Construction className="h-9 w-9 text-yellow-600" />
    </div>
  ),
  
  renderDumpTruckIcon: () => (
    <div className="p-2 rounded-full bg-gray-100 flex items-center justify-center">
      <Truck className="h-9 w-9 text-gray-700" />
    </div>
  ),
  
  renderWaterTruckIcon: () => (
    <div className="p-2 rounded-full bg-cyan-100 flex items-center justify-center">
      <Droplets className="h-9 w-9 text-cyan-600" />
    </div>
  ),
  
  renderExcavatorIcon: () => (
    <div className="p-2 rounded-full bg-orange-100 flex items-center justify-center">
      <Shovel className="h-9 w-9 text-orange-600" />
    </div>
  ),
  
  renderDumpLoaderIcon: () => (
    <div className="p-2 rounded-full bg-amber-100 flex items-center justify-center">
      <Forklift className="h-9 w-9 text-amber-600" />
    </div>
  ),
  
  renderCraneIcon: () => (
    <div className="p-2 rounded-full bg-red-100 flex items-center justify-center">
      <Construction className="h-9 w-9 text-red-600" />
    </div>
  ),
  
  renderLowbedIcon: () => (
    <div className="p-2 rounded-full bg-indigo-100 flex items-center justify-center">
      <Truck className="h-9 w-9 text-indigo-600" />
    </div>
  ),
  
  renderForkliftIcon: () => (
    <div className="p-2 rounded-full bg-purple-100 flex items-center justify-center">
      <Forklift className="h-9 w-9 text-purple-600" />
    </div>
  ),
  
  renderAsphaltIcon: () => (
    <div className="p-2 rounded-full bg-green-100 flex items-center justify-center">
      <Construction className="h-9 w-9 text-green-600" />
    </div>
  ),
  
  renderEngineerIcon: () => (
    <div className="p-2 rounded-full bg-blue-100 flex items-center justify-center">
      <Wrench className="h-9 w-9 text-blue-700" />
    </div>
  ),
  
  renderBasketIcon: () => (
    <div className="p-2 rounded-full bg-pink-100 flex items-center justify-center">
      <HardHat className="h-9 w-9 text-pink-600" />
    </div>
  )
};
