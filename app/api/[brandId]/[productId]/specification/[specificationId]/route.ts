import { NextResponse } from "next/server";

import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";

export async function GET(
  req: Request,
  { params }: { params: { specificationId: string } }
) {
  try {
    if (!params.specificationId) {
      return new NextResponse("Specification id is required", { status: 400 });
    }

    const specification = await prismadb.specification.findUnique({
      where: {
        id: params.specificationId
      }
    });
    console.log("MASOK GET AKHIR")
    return NextResponse.json(specification);
  } catch (error) {
    console.log('[SPECIFICATION_GET]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};

export async function DELETE(
  req: Request,
  { params }: { params: { specificationId: string, brandId: string } }
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }

    if (!params.specificationId) {
      return new NextResponse("Specification id is required", { status: 400 });
    }

    const brandByUserId = await prismadb.brand.findFirst({
      where: {
        id: params.brandId,
        userId
      }
    });

    if (!brandByUserId) {
      return new NextResponse("Unauthorized", { status: 405 });
    }

    const specification = await prismadb.specification.delete({
      where: {
        id: params.specificationId
      }
    });
  
    return NextResponse.json(specification);
  } catch (error) {
    console.log('[SPECIFICATION_DELETE]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};


export async function PATCH(
  req: Request,
  { params }: { params: { productId: string, brandId: string, specificationId: string } }
) {
  try {
    const { userId } = auth();

    const body = await req.json();

    const { 
      impedance,
      dc_resistance_re  ,
      coil_inductance_le  ,
      effective_piston_area_sd  ,
      voice_coil_diameter ,
      voice_coil_height ,
      air_gap_height  ,
      linear_coil_travel_pp ,
      moving_mass_mms ,
      free_air_resonance_fs ,
      sensitivity ,
      mechanical_q_factor_qms ,
      electrical_q_factor_qes ,
      total_q_factor_qts  ,
      force_factor_bi ,
      rated_power_handling  ,
      magnetic_flux_density ,
      magnet_weight ,
      net_weight  ,
      equivalent_volume_vas ,
      compliance_cms  ,
      mechanical_loss_rms ,
      recommended_frequency_range ,
      max_mechanical_cone_excursion_xmech } = body;

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }

    if (!params.productId) {
      return new NextResponse("Product id is required", { status: 400 });
    }

    const brandByUserId = await prismadb.brand.findFirst({
      where: {
        id: params.brandId,
        userId
      }
    });

    if (!brandByUserId) {
      return new NextResponse("Unauthorized", { status: 405 });
    }
    
    const specification = await prismadb.specification.update({
      where: {
        id : params.specificationId
      },
      data: {
        impedance,
        dc_resistance_re,
        coil_inductance_le,
        effective_piston_area_sd,
        voice_coil_diameter,
        voice_coil_height,
        air_gap_height,
        linear_coil_travel_pp,
        moving_mass_mms,
        free_air_resonance_fs,
        sensitivity,
        mechanical_q_factor_qms,
        electrical_q_factor_qes,
        total_q_factor_qts,
        force_factor_bi,
        rated_power_handling,
        magnetic_flux_density,
        magnet_weight,
        net_weight,
        equivalent_volume_vas,
        compliance_cms,
        mechanical_loss_rms,
        recommended_frequency_range,
        max_mechanical_cone_excursion_xmech,
      }
    });
  
    return NextResponse.json(specification);
  } catch (error) {
    console.log('[SPECIFICATION_PATCH]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};
