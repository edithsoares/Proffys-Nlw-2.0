module.exports = async function(db, { proffyValue, classValue, classScheduleValues }) {
    // inserir dados na tabela de proffy
    const insertedProffy = await db.run(`
        INSERT INTO proffys (
            name,
            avatar,
            whatsapp,
            bio
        ) VALUES (
            "${proffyValue.name}",
            "${proffyValue.avatar}",
            "${proffyValue.whatsapp}",
            "${proffyValue.bio}"
        );
    `)

    const proffy_id = insertedProffy.lastID // pega o id fo último proffy cadastrado
    // inserir dados na tabela de classes
    const insertedClass = await db.run(`
            INSERT INTO classes (
                subject,
                cost,
                proffy_id
            ) VALUES (
                "${classValue.subject}",
                "${classValue.cost}",
                ${proffy_id}
            );
    `)

    const class_id = insertedClass.lastID // pega o id da última class inserida
    // inserir dados na tabela de class_schedule
    const insertedAllClassScheduleValues =  classScheduleValues.map((classScheduleValue) => {
        return db.run(`
            INSERT INTO class_schedule (
                class_id,
                weekday,
                time_from,
                time_to
            ) VALUES (
                ${class_id},
                "${classScheduleValue.weekday}",
                "${classScheduleValue.time_from}",
                "${classScheduleValue.time_to}"
            );
        `)
    })

    // aqui vou executar todos os db.runs() da class_schedule
    await Promise.all(insertedAllClassScheduleValues)
}