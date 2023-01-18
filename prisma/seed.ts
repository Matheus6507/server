import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient()

const firstHabitID = '27687441-6911-4b0e-a5d0-b937487ee29b'
const secondHabitID = 'c5132bac-45a3-4782-94b3-15cbfc953b37'
const thirdHabitID = '76ef6d9b-0e86-49f9-9858-6b436a37b5fc'

async function main() {
    await prisma.habit.deleteMany();
    await prisma.day.deleteMany();

    await Promise.all([
        await prisma.habit.create({
            data: {
                id: firstHabitID,
                title: 'Beber 2L de água',
                created_at: new Date('2022-12-31T00:00:00.000z'),
                weekDays: {
                    create: [
                        { week_day: 1 },
                        { week_day: 2 },
                        { week_day: 3 },
                    ]
                }
            }
        }),

        prisma.habit.create({
            data: {
                id: secondHabitID,
                title: 'Fazer 1H de exercícios',
                created_at: new Date('2023-01-03T00:00:00.000z'),
                weekDays: {
                    create: [
                        { week_day: 3 },
                        { week_day: 4 },
                        { week_day: 5 },
                    ]
                }
            }
        }),

        prisma.habit.create({
            data: {
                id: thirdHabitID,
                title: 'Dormir 8H',
                created_at: new Date('2023-01-08T00:00:00.000z'),
                weekDays: {
                    create: [
                        { week_day: 1 },
                        { week_day: 2 },
                        { week_day: 3 },
                        { week_day: 4 },
                        { week_day: 5 },
                    ]
                }
            }
        })
    ])

    await Promise.all([
        prisma.day.create({
            data: {
                date: new Date('2023-01-02T03:00:00.000z'),
                dayHabits: {
                    create: {
                        habit_id: firstHabitID
                    }
                }
            }
        }),

        prisma.day.create({
            data: {
                date: new Date('2023-01-06T03:00:00.000z'),
                dayHabits: {
                    create: {
                        habit_id: firstHabitID
                    }
                }
            }
        }),

        prisma.day.create({
            data: {
                date: new Date('2023-01-04T03:00:00.000z'),
                dayHabits: {
                    create: [
                        { habit_id: firstHabitID },
                        { habit_id: secondHabitID }
                    ]
                }
            }
        }),
    ])
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