"use client"; // если нужен для Next.js (можно убрать для Vite)

import { useState } from "react";
import { VStack, Input, Button, Box, Text, Spinner } from "@chakra-ui/react";
import { Select, Portal, createListCollection } from "@chakra-ui/react";
import { generateIdeas } from "../services/openai";

const models = createListCollection({
  items: [
    { label: "GPT-4.1 (Флагманская модель)", value: "gpt-4.1" },
    { label: "GPT-4.1 Mini (Быстрее и дешевле)", value: "gpt-4.1-mini" },
    {
      label: "GPT-4.1 Nano (Самая быстрая и экономичная)",
      value: "gpt-4.1-nano",
    },
  ],
});

function IdeaGenerator() {
  const [apiKey, setApiKey] = useState("");
  const [niche, setNiche] = useState("");
  const [model, setModel] = useState("gpt-4.1-nano");
  const [ideas, setIdeas] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (!apiKey.trim() || !niche.trim()) return;
    setLoading(true);

    try {
      const result = await generateIdeas(niche, apiKey, model);
      setIdeas(result);
    } catch (error) {
      console.error("Ошибка генерации:", error);
      alert("Ошибка генерации. Проверьте API-ключ и выбранную модель.");
    } finally {
      setLoading(false);
    }
  };

  const copyIdeas = () => {
    const ideasText = ideas.join("\n");
    navigator.clipboard.writeText(ideasText);
  };

  return (
    <VStack spacing={6} w="full">
      <Input
        placeholder="Введите ваш OpenAI API ключ"
        type="password"
        value={apiKey}
        onChange={(e) => setApiKey(e.target.value)}
      />

      <Select.Root
        collection={models}
        selectedKey={model.value}
        onSelectionChange={(key) => {
          const selectedModel = models.items.find((item) => item.value === key);
          if (selectedModel) {
            setModel(selectedModel);
          }
        }}
        width="100%"
      >
        <Select.HiddenSelect />

        <Select.Control>
          <Select.Trigger>
            <Select.ValueText placeholder="Выберите модель" />
          </Select.Trigger>
          <Select.IndicatorGroup>
            <Select.Indicator />
          </Select.IndicatorGroup>
        </Select.Control>

        <Portal>
          <Select.Positioner>
            <Select.Content>
              {models.items.map((item) => (
                <Select.Item key={item.value} item={item}>
                  {item.label}
                  <Select.ItemIndicator />
                </Select.Item>
              ))}
            </Select.Content>
          </Select.Positioner>
        </Portal>
      </Select.Root>

      <Input
        placeholder="Введите нишу (например: кофейня, фитнес-тренер)"
        value={niche}
        onChange={(e) => setNiche(e.target.value)}
      />

      <Button
        colorScheme="teal"
        w="full"
        onClick={handleGenerate}
        isLoading={loading}
      >
        Сгенерировать идеи
      </Button>

      {ideas.length > 0 && (
        <Button
          colorScheme="blue"
          variant="outline"
          w="full"
          onClick={copyIdeas}
        >
          Скопировать все идеи
        </Button>
      )}

      <Box w="full" mt={6}>
        {loading && <Spinner />}
        {ideas.map((idea, idx) => (
          <Text key={idx} mt={2}>
            • {idea}
          </Text>
        ))}
      </Box>
    </VStack>
  );
}

export default IdeaGenerator;
