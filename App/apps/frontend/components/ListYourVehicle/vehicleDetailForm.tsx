import { Input } from "../ui/input";
import { Label } from "../ui/label";

export default function VehicleDetailForm(){
    return <>
        {/* step - 1 */}
        <div className="p-2 bg-white rounded-lg border">
            <div className="text-2xl flex gap-3 items-center">
                 <p className="bg-green-300 rounded-full h-5 w-5 text-sm flex justify-center items-center">
                    1 
                </p>
                <h3 className="flex flex-col">
                    Vehicle Details <br/> 
                <p className="text-gray-500 text-lg">Tell us about your Vehicle</p>
                </h3>
            </div>
            <div className="border-gray-400 border rounded-lg w-full p-2 grid grid-cols-2 gap-8 text-2xl">
                <div>
                    <Label className="text-xl">
                        Brand
                    </Label>
                    <Input placeholder="Toyota" />
                </div>
                <div>
                    <Label className="text-xl">
                        Model Name
                    </Label>
                    <Input placeholder="Toyota" />
                </div>
                <div>
                    <Label className="text-xl">
                        Purchase Year
                    </Label>
                    <Input placeholder="Toyota" />
                </div>
                <div>
                    <Label className="text-xl">
                        Body type
                    </Label>
                    <Input placeholder="Toyota" />
                </div>
                <div>
                    <Label className="text-xl">
                        fuel
                    </Label>
                    <Input placeholder="Toyota" />
                </div>
                <div>
                    <Label className="text-xl">
                        Transmission
                    </Label>
                    <Input placeholder="Toyota" />
                </div>
                <div>
                    <Label className="text-xl">
                        Seats
                    </Label>
                    <Input placeholder="Toyota" />
                </div>
                <div>
                    <Label className="text-xl">
                        Registration number
                    </Label>
                    <Input placeholder="Toyota" />
                </div>
            </div>
        </div>
    </>
}