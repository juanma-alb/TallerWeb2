import { PrismaClient } from '@prisma/client'

export const prisma = new PrismaClient()

export async function cargarDatos() {

    async function upsertMarca(nombre: string) {
        const existing = await prisma.marca.findFirst({ where: { nombre } })
        if (existing) return existing
        return prisma.marca.create({ data: { nombre } })
    }

    async function upsertColor(nombre: string) {
        const existing = await prisma.color.findFirst({ where: { nombre } })
        if (existing) return existing
        return prisma.color.create({ data: { nombre } })
    }

    async function upsertTalle(numero: number) {
        const existing = await prisma.talle.findFirst({ where: { numero } })
        if (existing) return existing
        return prisma.talle.create({ data: { numero } })
    }

    const marcas = await Promise.all([
        upsertMarca('PUMA'),
        upsertMarca('FILA'),
        upsertMarca('ADIDAS'),
        upsertMarca('NIKE'),
    ])

    const colores = await Promise.all([
        upsertColor('Negro'),
        upsertColor('Blanco'),
        upsertColor('Rojo'),
        upsertColor('Azul'),
    ])

    const talles = await Promise.all([
        upsertTalle(38),
        upsertTalle(39),
        upsertTalle(40),
        upsertTalle(41),
    ])

    const sexos = ['hombre', 'mujer', 'niño'] as const

    function getRandomItems<T>(arr: T[], min = 1, max?: number): T[] {
        const maxItems = max ?? arr.length
        const count = Math.floor(Math.random() * (maxItems - min + 1)) + min
        const shuffled = arr.sort(() => 0.5 - Math.random())
        return shuffled.slice(0, count)
    }

    const existingCount = await prisma.zapatilla.count()

    if (existingCount !== 0) return

    for (let i = 0; i < 10; i++) {
        const marca = marcas[i % marcas.length]
        // Elegir un solo color aleatorio
        const color = getRandomItems(colores, 1, 1)[0]
        const sexo = sexos[i % sexos.length]
        const precio = 70000 + i * 1500

        const nombre = `Zapatilla ${marca.nombre} ${color.nombre} #${i + 1}`
        const descripcion = `Zapatilla cómoda para uso diario (${sexo})`

        // Elegir algunos talles aleatorios (entre 1 y todos)
        const tallesSeleccionados = getRandomItems(talles, 1)

        await prisma.zapatilla.create({
            data: {
                nombre,
                marcaId: marca.id,
                colorId: color.id,
                sexo,
                precio,
                descripcion,
                imagen: `zapatilla-${(i % 5) + 1}.webp`,
                stock: {
                    create: tallesSeleccionados.map((t, idx) => ({
                        talleId: t.id,
                        cantidad: 3 + ((i + idx) % 5),
                    })),
                },
            },
        })

        console.log(`Zapatilla creada: ${nombre}`)
    }
}
