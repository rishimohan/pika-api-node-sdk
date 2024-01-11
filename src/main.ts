export class PikaApi {
  private readonly apiKey: string;
  
  constructor(apiKey: string) {
    if (!apiKey) {
      throw new Error("API Key is required.")
    }
    this.apiKey = apiKey;
  }

  public getBaseUrl(version?: string) {
    const baseUrl = "https://api.pika.style";

    let apiVersion = "v1";

    if (version) {
      apiVersion = version;
    }

    return `${baseUrl}/${apiVersion}`;
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

    let endpoint = `${this.getBaseUrl()}/templates/${templateId}/images`;

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
