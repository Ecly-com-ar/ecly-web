"use client";

import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "¿Ya está disponible Ecly?",
    answer: "Estamos en fase de lanzamiento en Córdoba. Registrate en nuestro formulario para tener prioridad en la instalación en tu zona."
  },
  {
    question: "¿Tiene costo sumarse ahora?",
    answer: "No. Es una preinscripción totalmente gratuita y sin compromiso. Nos sirve para mapear la demanda y planificar el lanzamiento."
  },
  {
    question: "¿Cuándo se instalarían los dispensers?",
    answer: "El cronograma de instalaciones dependerá de la cantidad de comercios interesados en cada zona. ¡Cuantos más se sumen en tu barrio, más rápido llegaremos!"
  },
  {
    question: "¿Qué beneficios tiene para mi negocio?",
    answer: "Ecly te permite aumentar el ticket promedio, diferenciarte de la competencia con una propuesta eco-innovadora y atraer clientes que buscan consumo responsable."
  }
];

const FAQSection = () => {
  return (
    <section className="py-24 bg-ecly-light">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-black text-center text-slate-900 mb-12">
          Preguntas Frecuentes 💡
        </h2>
        <Accordion type="single" collapsible className="w-full space-y-4">
          {faqs.map((faq, idx) => (
            <AccordionItem 
              key={idx} 
              value={`item-${idx}`} 
              className="bg-white rounded-[2rem] border-none px-6 py-2 shadow-sm"
            >
              <AccordionTrigger className="text-left text-lg font-black text-slate-900 hover:no-underline">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-slate-600 font-bold text-base leading-relaxed">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

export default FAQSection;