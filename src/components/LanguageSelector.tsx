/*
 Copyright 2022 Google LLC

 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

      https://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
 */
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
