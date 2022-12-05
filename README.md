# NoodleBot 🍜

Hecho por:

- Orozco Torrez Jose Ivan 🍜
- Padilla Valdez Gustavo 🍜

Creamos un bot llamado noodlebot usando tensorflow js, entrenamos a nuestro bot con un archivo tsv el cual tiene mas de 5,000 frases y las clasifica por emoción, una vez entrenado intenta clasificar cualquier frase que le demos, así que lo adaptamos para que te haga una serie de preguntas, cada que contestas una pregunta evalúa tu texto, le asigna una emoción y las va almacenando para finalmente mostrar tus resultados en forma gráfica.

## Conversación ejemplo con NoodleBot

![Conversation 1](/ReadmeImages/conv1.png)
![Conversation 1 PT2](/ReadmeImages/conv2.png)

La creación de este chatbot nos permitió experimentar con inteligencia artificial y comprender un poco mejor el funcionamiento de estos, definitivamente pensamos en mejorar nuestro bot para que sea realmente útil y pueda predecir de mejor manera las emociones, ya que esto sería por ejemplo útil para un chatbot de ayuda con la depresión para identificar si el usuario se siente mal y proveer ayuda.

## XSS Attack

El ataque Cross Site Scripting significa enviar e inyectar código o script malicioso. El código malicioso generalmente se escribe con lenguajes de programación del lado del cliente como Javascript, HTML, VBScript.

![XSS1](/ReadmeImages/xss1.png)
![XSS2](/ReadmeImages/xss2.png)
![XSS3](/ReadmeImages/xss3.png)

En el NoodleBot se hicieron varios ataques de XSS primitivo el cual solo se basa en tratar de inyectar scripts y esperar a que se ejecuten, pero dado a que nuestras entradas estan sanitizadas, ninguno de los ataques tuvo exito.

## OpenShift

La aplicación está hosteada en OpenShift disponible [aqui](https://noodlebot-vandelvan-dev.apps.sandbox.x8i5.p1.openshiftapps.com/)
![OS1](/ReadmeImages/os1.png)
Con OpenShift uestra aplicación está dockerizada y usando kubernetes estando almacenada en los servidores de RedHat, y encima de esto, OpenShift incluye practicas de seguridad que protegen nuestra aplicación, ademas de esto nos permite monitorear los eventos y recursos utilizados por la aplicación:
![OS2](/ReadmeImages/os2.png)
![OS3](/ReadmeImages/os3.png)
![OS4](/ReadmeImages/os4.png)

## Kraken

Red-Hat tiene una herramienta de chaos Engineering llamada [Kraken](https://github.com/redhat-chaos/krkn) la cual permite crear errores en nuestra aplicación hosteada en OpenShift de manera controlada, sin embargo, Gracias a [Cerberus](https://github.com/redhat-chaos/cerberus) que verifica la salud de los clusters activos, nuestra aplicación puede recuperarse sin problemas al detectar un error.
![Krkn](https://raw.githubusercontent.com/redhat-chaos/krkn/main/media/kraken-workflow.png)
