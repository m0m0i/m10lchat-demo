import { Flex, Select, Text } from "@chakra-ui/react";
import React, { useContext, useEffect, useState } from "react";

import { AuthContext } from "../auth/AuthProvider";
import { getPreferredLanguage, setLSValue } from "../service/lsHandler";
import { languageAndCodes } from "../utils/languageSupport";

export const LanguageSelector: React.FC = () => {
  const [selectedLanguage, setSelectedLanguage] = useState<string>("");
  const { currentUser } = useContext(AuthContext);
  const id = currentUser?.uid;

  useEffect(() => {
    const savedLanguage = id && getPreferredLanguage(id);
    savedLanguage
      ? setSelectedLanguage(savedLanguage)
      : setSelectedLanguage(window.navigator.language.slice(0, 2));
  }, [id]);

  const handleOnChange = (e: any) => {
    const value = e.target.value;
    id && setLSValue(id, { language: value });
    setSelectedLanguage(value);
  };

  return (
    <Flex flexDirection={"row"} justifyContent="flex-start" mb={2}>
      <Text
        alignSelf={"end"}
        fontSize={"xs"}
        color={"gray.400"}
        as={"p"}
        mr={4}
      >
        {"Language setting:"}
      </Text>
      <Select
        alignSelf={"flex-end"}
        maxW="150"
        placeholder="Select your language"
        size="xs"
        value={selectedLanguage}
        onChange={handleOnChange}
        variant="unstyled"
      >
        {languageAndCodes.map((language: [string, string], key: number) => (
          <option value={language[1]} key={key}>
            {language[0]}
          </option>
        ))}
      </Select>
    </Flex>
  );
};
