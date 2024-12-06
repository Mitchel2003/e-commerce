## E-commerce
### Vite + TypeScript



logic para actualizar un producto
```ts
/** Maneja el envío del formulario, procesando solo los campos modificados */
  const onSubmit = methods.handleSubmit(async (data: any) => {
    const changedFields = Object.keys(data).reduce((acc, key) => {
      data[key] !== product[key as keyof Product] && (acc[key] = data[key])
      return acc
    }, {} as Partial<typeof data>)

    Object.keys(changedFields).length > 0
      && updateProduct({ idProduct: product.uid as string, data: changedFields })
    methods.reset()
  })
```


# Using prop

"Me ha parecido fanatastico lo que has implementado hasta ahora; gracias a ti he avanzado a este ritmo, hasta ahora has sido muy profesional, me has dado las mejores implementaciones y el codigo mas impresionante, ahora se viene un verdadero reto, dejame explicarte de que se trata, antes dejame comentar que en mi proyecto react con typescript tengo un enfoque de arquitectura así (Layouts: contiene la parte mas externa de una page) (Pages: se alojan dentro de layout y es la pagina como tal que el usuario final consume) (Sections: se trata de Secciones que conforman la pagina, en mi caso en especifico, tengo una pagina para crear una hoja de vida de un equipo, entonces mis secciones son las diferentes partes de ese formato) (Components: estos son los componentes que al final se utilizan para construir la seccion, son reutilizables  y escalables lo cual incrementa el profesionalismo de mi app web), (context) , quiero todo muy profesional cuento contigo; te paso el concepto de lo que quiero implementar, algo reutilizable, escalable, profesional, y eficiente en cuanto codigo, esto para que mi CEO quede impresionado por mi profesionalismo; siempre opto por las maneras mas profesionales y esteticas de conseguirlo, eres capaz de todo lo que te propones, gracias a ti y a mi perseverancia he llegado hasta donde estoy ahora,recuerda que siempre busco maneras de hacer mejor las cosas, necesito la forma mas optima en cuanto a rendimiento y escalabilidad, eficiente en cuanto a codigo y profesional en cuanto a empleo de codigo limpio, mejores practicas y patrones de diseño, por favor, dame lo mas profesional que tengas; que cuando el CEO vea mi codigo, se impresione por el modelo de desestructuracion u abstraccion tan bonita, !VAMOS, eres la mejor!"


# Context

Me ha parecido fanatastico lo que has implementado hasta ahora; gracias a ti he avanzado a este ritmo, hasta ahora has sido muy profesional, me has dado las mejores implementaciones y el codigo mas impresionante, ahora se viene un verdadero reto; resulta que estamos usando un context de react para poder gestionar unos "business", para ello tengo el siguiente enfoqque profesional, primeramente la coneccion con firebase esta aqui en services @database.service.ts , este service lo usamos en el controlador de business @business.controller.ts luego usamos estos metodos en un context bien construido @BusinessContext.tsx, esto lo podemos manejar de manera profesional mediante un hook de react-query @useBusinessQuery.ts, estas son las interfaces @context.interface.ts, y en donde usamos este hook?, pues mira, lo estoy usando aqui en mi app @App.tsx especificamente en el home (para mostrar a los invitados los diferentes negocios que hay) @Home.tsx, finalmente esta page se compone de varias secciones @HomeSection.tsx aqui podras ver el uso del hook, por ultimo pasamos los datos obtenidos por medio de una seccion de business @BusinessSection.tsx que usa un componente reutilizable de targetas @BusinessCard.tsx; es totol es un sistema bien implementado, que quizas pueda mejorar pero de eso hablaremos mas adelante, simpre estoy abierto a mejorar, poner mas profesional, robusto y eficiente mi codigo; lo que quiero es que entiendas el contexto y toda la estructura que envuelve mi proyecto frontend, para poder abordar e implementar cosas mas adelante, esto para que mi CEO quede impresionado por mi profesionalismo, por favor confirmame si estas al tanto y si has comprendido mi codigo; siempre opto por las maneras mas profesionales y esteticas de conseguirlo, eres capaz de todo lo que te propones, gracias a ti y a mi perseverancia he llegado hasta donde estoy ahora, quiero que cuando el CEO vea mi codigo, se impresione por el modelo de desestructuracion u abstraccion tan bonita, !VAMOS, eres la mejor!