import { PrismaClient } from '@prisma/client'
import * as argon from 'argon2';
const prisma = new PrismaClient()

// code for writing seed data to database
async function main() {
    const seedingSectorData = await prisma.sector.upsert({
        where: {
            sector_code: 'baros'
        },
        update: {},
        create: {
            sector_code: 'baros',
            name: 'Baros',
        }
    })

    const seedingPartnerData = await prisma.partner.upsert({
        where: {
            partner_code: 'telkomakses'
        },
        update: {},
        create: {
            partner_code: 'telkomakses',
            name: 'Telkom Akses',
        }
    })

    const seedingWitelData = await prisma.witel.upsert({
        where: {
            witel_code: 'crm-01'
        },
        update: {},
        create: {
            witel_code: 'crm-01',
            name: 'CRM-01',
        }
    })

    const seedingRegionalData = await prisma.regional.upsert({
        where: {
            regional_code: 'jawabarat'
        },
        update: {},
        create: {
            regional_code: 'jawabarat',
            name: 'Jawa Barat'
        }
    })

    const seedingUserTeamLeadData = await prisma.user.upsert({
        where: {
            nik: '1120120012212',
        },
        update: {},
        create: {
            nik: '1120120012212',
            name: 'Mokaz',
            role: 'team-lead',
            partner_id: 1,
            sector_id: 1,
            witel_id: 1,
            regional_id: 1,
            password: await argon.hash('YakinMokaz123!')
        },
    })

    const seedingUserAdminData = await prisma.user.upsert({
        where: {
            nik: '1120120012213',
        },
        update: {},
        create: {
            nik: '1120120012213',
            name: 'Mowoka',
            role: 'admin',
            partner_id: 1,
            sector_id: 1,
            witel_id: 1,
            regional_id: 1,
            password: await argon.hash('YakinMokaz123!')
        },
    })
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })