const express = require('express');
const multer = require('multer');
const fs = require('fs');
const pdf = require('pdf-parse');
const { Router } = require('express');
const router = Router();
const upload = multer({ dest: 'uploads/' });

router.post('/', upload.single('file'), async (req, res) => {
    const filePath = req.file.path;

    try {
        const dataBuffer = fs.readFileSync(filePath);
        const data = await pdf(dataBuffer);

        // Convertir el texto a minúsculas
        const text = data.text.toLowerCase();
        console.log('Texto extraído del PDF:', text);

        // Función para extraer datos usando expresiones regulares
        const extractData = (regex) => {
            const match = text.match(regex);
            return match ? match[1].replace(',', '') : '0';
        };

        const resultado = {
            biometria_hematica: {
                globulos_rojos: parseFloat(extractData(/globulos?\s*rojos?\s*[:\s]*([\d.,]+)/)) ||
                                parseFloat(extractData(/eritrocitos\s*[:\s]*([\d.,]+)/)),
                hemoglobina: parseFloat(extractData(/hemoglobina\s*[:\s]*([\d.,]+)/)) ||
                             parseFloat(extractData(/hb\s*[:\s]*([\d.,]+)/)),
                hematocrito: parseFloat(extractData(/hematocrito\s*[:\s]*([\d.,]+)/)) ||
                             parseFloat(extractData(/hct\s*[:\s]*([\d.,]+)/)),
                plaquetas: parseInt(extractData(/plaquetas\s*[:\s]*([\d.,]+)/)) ||
                           parseInt(extractData(/plaquetas\s*[:\s]*([\d.,]+)/))
            },
            creatinina_serica: parseFloat(extractData(/creatinina\s*serica\s*[:\s]*([\d.,]+)/)) ||
                               parseFloat(extractData(/creatinine\s*[:\s]*([\d.,]+)/)),
            tfg: parseFloat(extractData(/tfg\s*[:\s]*([\d.,]+)/)) ||
                 parseFloat(extractData(/gfr\s*[:\s]*([\d.,]+)/)),
            proteina_orina: parseInt(extractData(/proteína\s*orina\s*[:\s]*([\d.,]+)/)) ||
                            parseInt(extractData(/urine\s*protein\s*[:\s]*([\d.,]+)/)),
            acido_urico: parseFloat(extractData(/ácido\s*úrico\s*[:\s]*([\d.,]+)/)) ||
                          parseFloat(extractData(/uric\s*acid\s*[:\s]*([\d.,]+)/)),
            hba1c: parseFloat(extractData(/hba1c\s*[:\s]*([\d.,]+)/)) ||
                   parseFloat(extractData(/a1c\s*[:\s]*([\d.,]+)/)),
            colesterol_total: parseInt(extractData(/colesterol\s*total\s*[:\s]*([\d.,]+)/)) ||
                              parseInt(extractData(/total\s*cholesterol\s*[:\s]*([\d.,]+)/)),
            ldl: parseInt(extractData(/ldl\s*[:\s]*([\d.,]+)/)) ||
                 parseInt(extractData(/low\s*density\s*lipoprotein\s*[:\s]*([\d.,]+)/)),
            hdl: parseInt(extractData(/hdl\s*[:\s]*([\d.,]+)/)) ||
                 parseInt(extractData(/high\s*density\s*lipoprotein\s*[:\s]*([\d.,]+)/)),
            trigliceridos: parseInt(extractData(/triglicéridos\s*[:\s]*([\d.,]+)/)) ||
                           parseInt(extractData(/triglycerides\s*[:\s]*([\d.,]+)/))
        };

        res.json({ resultado });

    } catch (error) {
        console.error('Error processing file:', error);
        res.status(500).json({ error: 'Error processing file' });
    } finally {
        // Limpiar archivos temporales
        fs.unlinkSync(filePath);
    }
});

module.exports = router;
