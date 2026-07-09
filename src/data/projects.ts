export const projects = {
  name: "Prapper AI",
  subtitle: "AI Agent Builder Platform",
  description: "Production SaaS platform enabling businesses to create custom AI chatbots with document retrieval, lead management, and embeddable widgets built with Next.js, LangChain, and Supabase.",
  details: {
    product: {
      name: "prapper.ai",
      version: "v1.0",
      license: "Proprietary",
      platforms: ["Android", "iOS", "Windows", "macOS", "Linux"],
      apiEndpoint: "https://api.prapper.ai",
      documentation: "https://docs.prapper.ai"
    },
    features: [
      "Real-time streaming of documents",
      "Supports multiple languages and formats",
      "Supports custom agents and integrations",
      "LLM integration for enhanced document processing",
      "Supports various LLMs (e.g., GPT-3.5, GPT-4)",
      "Custom agent creation with customizable features",
      "Supports custom actions and integrations"
    ],
    integrations: [
      "Google Cloud Vision",
      "Amazon Rekognition",
      "OpenAI API",
      "Microsoft Azure Cognitive Services",
      "IBM Watson Assistant",
      "Amazon Lex",
      "Google Dialogflow",
      "WeChat Mini Program"
    ],
    license: {
      type: "Proprietary",
      minVersion: "2.0",
      maxVersion: "5.0"
    }
  }
};