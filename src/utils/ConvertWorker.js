import Convert from './Convert';

onmessage = (event) => {
  const message = event.data;

  if (message.type === "start") {
    const source = message.data.source;
    const outputType = message.data.outputType;
    new Convert(source, outputType);
  }

};
