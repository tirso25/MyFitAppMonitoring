const keepAlive = async () => {
    const services = [
        {
            name: 'Render Backend',
            url: process.env.RENDER_URL || 'https://myfitapp.onrender.com/api/health/backEndCheck',
            type: 'backend'
        },
        {
            name: 'Vercel Frontend',
            url: process.env.VERCEL_URL || 'https://myfitappp.vercel.app',
            type: 'frontend'
        },
        {
            name: 'Aiven Database',
            url: process.env.AIVEN_URL || 'https://myfitapp.onrender.com/api/health/dataBaseCheck',
            type: 'database'
        }
    ];

    console.log(`Iniciando keep-alive - ${new Date().toISOString()}`);

    for (const service of services) {
        try {
            console.log(`Haciendo ping a ${service.name}...`);

            const response = await fetch(service.url, {
                method: 'GET',
                headers: {
                    'User-Agent': 'KeepAlive-Bot/1.0',
                    'Accept': 'application/json, text/html, */*'
                },
                timeout: 30000
            });

            if (response.ok) {
                console.log(`${service.name}: OK (${response.status})`);
            } else {
                console.log(`${service.name}: Respuesta ${response.status}`);
            }

        } catch (error) {
            console.error(`Error en ${service.name}: ${error.message}`);
        }

        await new Promise(resolve => setTimeout(resolve, 2000));
    }

    console.log(`Keep-alive completado - ${new Date().toISOString()}`);
};

if (require.main === module) {
    keepAlive().catch(console.error);
}

module.exports = keepAlive;
