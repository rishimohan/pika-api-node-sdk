interface Headers {
  "Content-Type": string,
  "Authorization": string
}

export class PikaApi {
  private readonly apiKey: string;
  
  constructor(apiKey: string) {
    if (!apiKey) {
      throw new Error("API Key is required.")
    }
    this.apiKey = apiKey;
  }

  public getEndpoint(templateId: string, version?: string) {
    const baseUrl = "https://api.pika.style";

    let apiVersion = "v1";

    if (version) {
      apiVersion = version;
    }

    return `${baseUrl}/${apiVersion}/templates/${templateId}/images`;
  }

  public getHeaders() {
    return {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.apiKey}`
    };
  }

  public async generateImageFromTemplate(templateId: string, modifications: any, responseFormat?: string) {
    if (!responseFormat) {
      responseFormat = "base64";
    }

    let endpoint = this.getEndpoint(templateId);

    const response = await fetch(endpoint, {
      method: "POST",
      headers: this.getHeaders(),
      body: JSON.stringify({
        response_format: responseFormat,
        modifications: modifications,
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to fetch image: " + response.status);
    }

    if (responseFormat === "base64") {
      const jsonData = await response.json();
      return jsonData;
    } else {
      return response;
    }
  }
}

export default PikaApi;
