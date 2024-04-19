"use client"

import * as z from "zod"
import axios from "axios"
import { useEffect, useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { toast } from "react-hot-toast"
import { Trash } from "lucide-react"
import { Specification } from "@prisma/client"
import { useParams, useRouter } from "next/navigation"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Separator } from "@/components/ui/separator"
import { Heading } from "@/components/ui/heading"
import { AlertModal } from "@/components/modals/alert-modal"
import { Label } from "@/components/ui/label"


interface SpecFormProps {
  initialData: Specification
};

export const SpecForm: React.FC<SpecFormProps> = ({
  initialData,
}) => {
  const [spec, setSpec] = useState<Specification>();
  const params = useParams();
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const title = initialData ? 'Edit specification' : 'Create specification';
  const description = initialData ? 'Edit a specification.' : 'Add a new specification';
  const toastMessage = initialData ? 'Specification updated.' : 'Specification created.';
  const action = initialData ? 'Save changes' : 'Create';


  useEffect(() => {
    if(initialData){
      setSpec(initialData)
    }
   } , [initialData]);

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const temp : Specification = {
      // @ts-ignore
      impedance: event.target[0].value,
      // @ts-ignore
      dc_resistance_re: event.target[1].value,
      // @ts-ignore
      coil_inductance_le: event.target[2].value,
      // @ts-ignore
      effective_piston_area_sd: event.target[3].value,
      // @ts-ignore
      voice_coil_diameter: event.target[4].value,
      // @ts-ignore
      voice_coil_height: event.target[5].value,
      // @ts-ignore
      air_gap_height: event.target[6].value,
      // @ts-ignore
      linear_coil_travel_pp: event.target[7].value,
      // @ts-ignore
      moving_mass_mms: event.target[8].value,
      // @ts-ignore
      free_air_resonance_fs: event.target[9].value,
      // @ts-ignore
      sensitivity: event.target[10].value,
      // @ts-ignore
      mechanical_q_factor_qms: event.target[11].value,
      // @ts-ignore
      electrical_q_factor_qes: event.target[12].value,
      // @ts-ignore
      total_q_factor_qts: event.target[13].value,
      // @ts-ignore
      force_factor_bi: event.target[14].value,
      // @ts-ignore
      rated_power_handling: event.target[15].value,
      // @ts-ignore
      magnetic_flux_density: event.target[16].value,
      // @ts-ignore
      magnet_weight: event.target[17].value,
      // @ts-ignore
      net_weight: event.target[18].value,
      // @ts-ignore
      equivalent_volume_vas: event.target[19].value,
      // @ts-ignore
      compliance_cms: event.target[20].value,
      // @ts-ignore
      mechanical_loss_rms: event.target[21].value,
      // @ts-ignore
      recommended_frequency_range: event.target[22].value,
      // @ts-ignore
      max_mechanical_cone_excursion_xmech: event.target[23].value,
      productId: "",
      createdAt:new Date(),
      updatedAt:new Date(),
      id:"",
    }
    try {
      setLoading(true);
      if (initialData) {
        await axios.patch(`/api/${params.brandId}/${params.productId}/specification/${initialData.id}`, temp);
      } else {
        await axios.post(`/api/${params.brandId}/${params.productId}/specification`, temp);
      }
      router.refresh();
      router.push(`/${params.brandId}/products`);
      toast.success(toastMessage);
    } catch (error: any) {
      toast.error('Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  const onDelete = async () => {
    try {
      setLoading(true);
      await axios.delete(`/api/${params.brandId}/${params.productId}/specification/${initialData.id}`);
      router.refresh();
      router.push(`/${params.brandId}/products`);
      toast.success('Specification deleted.');
    } catch (error: any) {
      toast.error('Something went wrong.');
    } finally {
      setLoading(false);
      setOpen(false);
    }
  }

  return (
    <>
    <AlertModal 
      isOpen={open} 
      onClose={() => setOpen(false)}
      onConfirm={onDelete}
      loading={loading}
    />
     <div className="flex items-center justify-between">
        <Heading title={title} description={description} />
        {initialData && (
          <Button
            disabled={loading}
            variant="destructive"
            size="sm"
            onClick={() => setOpen(true)}
          >
            <Trash className="h-4 w-4" />
          </Button>
        )}
      </div>
      <Separator />
        <form onSubmit={onSubmit} className="space-y-8 w-full">
          <div className="md:grid md:grid-cols-3 gap-8">
            <div>
            <Label htmlFor="impedance">Impedance</Label>
            <Input disabled={loading} id="impedance" placeholder="Impedance value" defaultValue={spec?.impedance? spec.impedance : ""} />
            </div>
            <div>
            <Label htmlFor="dc_resistance_re">DC Resistance RE</Label>
            <Input disabled={loading} id="dc_resistance_re" placeholder="dc_resistance_re value" defaultValue={spec?.dc_resistance_re? spec.dc_resistance_re : ""} />
            </div>
            <div>
            <Label htmlFor="coil_inductance_le">coil_inductance_le</Label>
            <Input disabled={loading} id="coil_inductance_le" placeholder="coil_inductance_le value" defaultValue={spec?.coil_inductance_le? spec.coil_inductance_le : ""} />
            </div>
            <div>
            <Label htmlFor="effective_piston_area_sd">effective_piston_area_sd</Label>
            <Input disabled={loading} id="effective_piston_area_sd" placeholder="effective_piston_area_sd value" defaultValue={spec?.effective_piston_area_sd? spec.effective_piston_area_sd : ""} />
            </div>
            <div>
            <Label htmlFor="voice_coil_diameter">voice_coil_diameter</Label>
            <Input disabled={loading} id="voice_coil_diameter" placeholder="voice_coil_diameter value" defaultValue={spec?.voice_coil_diameter? spec.voice_coil_diameter : ""} />
            </div>
            <div>
            <Label htmlFor="voice_coil_height">voice_coil_height</Label>
            <Input disabled={loading} id="voice_coil_height" placeholder="voice_coil_height value" defaultValue={spec?.voice_coil_height? spec.voice_coil_height : ""} />
            </div>
            <div>
            <Label htmlFor="air_gap_height">air_gap_height</Label>
            <Input disabled={loading} id="air_gap_height" placeholder="air_gap_height value" defaultValue={spec?.air_gap_height? spec.air_gap_height : ""} />
            </div>
            <div>
            <Label htmlFor="linear_coil_travel_pp">linear_coil_travel_pp</Label>
            <Input disabled={loading} id="linear_coil_travel_pp" placeholder="linear_coil_travel_pp value" defaultValue={spec?.linear_coil_travel_pp? spec.linear_coil_travel_pp : ""} />
            </div>
            <div>
            <Label htmlFor="moving_mass_mms">moving_mass_mms</Label>
            <Input disabled={loading} id="moving_mass_mms" placeholder="moving_mass_mms value" defaultValue={spec?.moving_mass_mms? spec.moving_mass_mms : ""} />
            </div>
            <div>
            <Label htmlFor="free_air_resonance_fs">free_air_resonance_fs</Label>
            <Input disabled={loading} id="free_air_resonance_fs" placeholder="free_air_resonance_fs value" defaultValue={spec?.free_air_resonance_fs? spec.free_air_resonance_fs : ""} />
            </div>
            <div>
            <Label htmlFor="sensitivity">sensitivity</Label>
            <Input disabled={loading} id="sensitivity" placeholder="sensitivity value" defaultValue={spec?.sensitivity? spec.sensitivity : ""} />
            </div>
            <div>
            <Label htmlFor="mechanical_q_factor_qms">mechanical_q_factor_qms</Label>
            <Input disabled={loading} id="mechanical_q_factor_qms" placeholder="mechanical_q_factor_qms value" defaultValue={spec?.mechanical_q_factor_qms? spec.mechanical_q_factor_qms : ""} />
            </div>
            <div>
            <Label htmlFor="electrical_q_factor_qes">electrical_q_factor_qes</Label>
            <Input disabled={loading} id="electrical_q_factor_qes" placeholder="electrical_q_factor_qes value" defaultValue={spec?.electrical_q_factor_qes? spec.electrical_q_factor_qes : ""} />
            </div>
            <div>
            <Label htmlFor="total_q_factor_qts">total_q_factor_qts</Label>
            <Input disabled={loading} id="total_q_factor_qts" placeholder="total_q_factor_qts value" defaultValue={spec?.total_q_factor_qts? spec.total_q_factor_qts : ""} />
            </div>
            <div>
            <Label htmlFor="force_factor_bi">force_factor_bi</Label>
            <Input disabled={loading} id="force_factor_bi" placeholder="force_factor_bi value" defaultValue={spec?.force_factor_bi? spec.force_factor_bi : ""} />
            </div>
            <div>
            <Label htmlFor="rated_power_handling">rated_power_handling</Label>
            <Input disabled={loading} id="rated_power_handling" placeholder="rated_power_handling value" defaultValue={spec?.rated_power_handling? spec.rated_power_handling : ""} />
            </div>
            <div>
            <Label htmlFor="magnetic_flux_density">magnetic_flux_density</Label>
            <Input disabled={loading} id="magnetic_flux_density" placeholder="magnetic_flux_density value" defaultValue={spec?.magnetic_flux_density? spec.magnetic_flux_density : ""} />
            </div>
            <div>
            <Label htmlFor="magnet_weight">magnet_weight</Label>
            <Input disabled={loading} id="magnet_weight" placeholder="magnet_weight value" defaultValue={spec?.magnet_weight? spec.magnet_weight : ""} />
            </div>
            <div>
            <Label htmlFor="net_weight">net_weight</Label>
            <Input disabled={loading} id="net_weight" placeholder="net_weight value" defaultValue={spec?.net_weight? spec.net_weight : ""} />
            </div>
            <div>
            <Label htmlFor="equivalent_volume_vas">equivalent_volume_vas</Label>
            <Input disabled={loading} id="equivalent_volume_vas" placeholder="equivalent_volume_vas value" defaultValue={spec?.equivalent_volume_vas? spec.equivalent_volume_vas : ""} />
            </div>
            <div>
            <Label htmlFor="compliance_cms">compliance_cms</Label>
            <Input disabled={loading} id="compliance_cms" placeholder="compliance_cms value" defaultValue={spec?.compliance_cms? spec.compliance_cms : ""} />
            </div>
            <div>
            <Label htmlFor="mechanical_loss_rms">mechanical_loss_rms</Label>
            <Input disabled={loading} id="mechanical_loss_rms" placeholder="mechanical_loss_rms value" defaultValue={spec?.mechanical_loss_rms? spec.mechanical_loss_rms : ""} />
            </div>
            <div>
            <Label htmlFor="recommended_frequency_range">recommended_frequency_range</Label>
            <Input disabled={loading} id="recommended_frequency_range" placeholder="recommended_frequency_range value" defaultValue={spec?.recommended_frequency_range? spec.recommended_frequency_range : ""} />
            </div>
            <div>
            <Label htmlFor="max_mechanical_cone_excursion_xmech">max_mechanical_cone_excursion_xmech</Label>
            <Input disabled={loading} id="max_mechanical_cone_excursion_xmech" placeholder="max_mechanical_cone_excursion_xmech value" defaultValue={spec?.max_mechanical_cone_excursion_xmech? spec.max_mechanical_cone_excursion_xmech : ""} />
            </div>
            </div>
          <Button disabled={loading} className="ml-auto" type="submit">
            {action}
          </Button>
        </form>
    </>
  );
};
