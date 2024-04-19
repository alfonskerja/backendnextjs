import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs';

import prismadb from '@/lib/prismadb';
 
export async function POST(
  req: Request,
  { params }: { params: { brandId: string, productId: string } }
) {
  try {
    const { userId } = auth();

    const body = await req.json();

    const { impedance,
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

    const specification = await prismadb.specification.create({
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
      productId: params.productId
      }
    });

    const updatedProduct = await prismadb.product.update({
      where:{
        id: params.productId
      },
      data: {
        specId: specification.id
      }
    });

    return NextResponse.json({specification, updatedProduct});
  } catch (error) {
    console.log('[SPECIFICATION_POST]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};

export async function GET(
  req: Request,
  { params }: { params: { brandId: string, productId: string } }
) {
  try {
    if (!params.brandId) {
      return new NextResponse("Brand id is required", { status: 400 });
    }

    const specification = await prismadb.specification.findMany({
      where: {
        productId: params.productId
      }
    });
    return NextResponse.json(specification);
  } catch (error) {
    console.log('[SPECIFICATION_GET]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};
