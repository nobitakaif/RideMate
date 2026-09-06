import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import PhotoUpload from "./uploadPhoto";

const BodyType = [
    { label: "SUV", value: "suv" },
    { label: "Sedan", value: "sedan" },
    { label: "HatchBack", value: "hatchback" },
    { label: "Luxury", value: "luxury" },
    { label: "Electric", value: "electric" },
    { label: "Motorcycle", value: "motorcycle" },
    { label: "Scooty", value: "scooty" },
]

const TransmissionType = [
    { label: "Electric", value: "electric" },
    { label: "Manual", value: "manual" }
]


const Seats = [
    { label: 7, value: 7 },
    { label: 4, value: 4 },
    { label: 6, value: 6 },
    { label: 5, value: 5 }

]

const uploadPhoto = [
    { comp: <PhotoUpload text="front photo" /> },
    { comp: <PhotoUpload text="back photo" /> },
    { comp: <PhotoUpload text="left side photo" /> },
    { comp: <PhotoUpload text="right side photo" /> },

]

export default function VehicleDetailForm() {
    return <>
        {/* step - 1 */}
        <div className="p-2 rounded-lg ">
            <div className="flex flex-col gap-5">
                <div className="">
                    <div className=" text-2xl flex gap-3 items-center">
                        <p className="bg-green-300 rounded-full h-5 w-5 text-sm flex justify-center items-center">
                            1
                        </p>
                        <h3 className="flex flex-col">
                            Vehicle Details <br />
                            <p className="text-gray-500 text-lg">Tell us about your Vehicle</p>
                        </h3>
                    </div>
                </div>
                <div className=" border rounded-lg w-full bg-white p-2 grid grid-cols-2 gap-8 text-2xl ">
                    <div>
                        <Label className="text-xl">
                            Brand
                        </Label>
                        <Input placeholder="Maruti Suzuki" />
                    </div>
                    <div>
                        <Label className="text-xl">
                            Model Name
                        </Label>
                        <Input placeholder="Swift" />
                    </div>
                    <div>
                        <Label className="text-xl">
                            Purchase Year
                        </Label>
                        <Input placeholder="2018" type="date" />
                    </div>
                    <div>
                        <Label className="text-xl">
                            Body Type
                        </Label>
                        <Select>
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="SUV" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    {BodyType.map((item) => (
                                        <SelectItem key={item.value} value={item.value}>
                                            {item.label}
                                        </SelectItem>
                                    ))}
                                </SelectGroup>
                            </SelectContent>
                        </Select>
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
                        <Select>
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Automatic" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    {TransmissionType.map((item) => (
                                        <SelectItem key={item.value} value={item.value}>
                                            {item.label}
                                        </SelectItem>
                                    ))}
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                    <div>
                        <Label className="text-xl">
                            Seats
                        </Label>
                        <Select>
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="6" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    {Seats.map((item) => (
                                        <SelectItem key={item.value} value={item.value.toString()}>
                                            {item.label}
                                        </SelectItem>
                                    ))}
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                    <div>
                        <Label className="text-xl">
                            Registration number
                        </Label>
                        <Input placeholder="MH-1628" />
                    </div>
                </div>

                <div>
                    <div className=" text-2xl flex gap-3 items-center">
                        <p className="bg-green-300 rounded-full h-5 w-5 text-sm flex justify-center items-center">
                            2
                        </p>
                        <h3 className="flex flex-col">
                            Photos <br />
                            <p className="text-gray-500 text-lg">Add at least 4 clear photos. Owners with photo 6+ photos earn 32% more.</p>
                        </h3>
                    </div>
                </div>
                <div className=" border bg-white rounded-lg w-full p-2 grid grid-cols-3 gap-8 text-2xl">
                    {uploadPhoto.map((i) => {
                        return i.comp
                    })}
                </div>
            </div>
        </div>
    </>
}