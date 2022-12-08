import { PluginOption } from "vite";

const generate = (tag: string, attrRaw: string, content: string) => `
<template>
<${tag}${attrRaw ? ` ${attrRaw}` : ""}><!-- generate by vite-plugin-vue-template-tag -->${content}</${tag}>
</template>
`
const transferAttribute = (raw: string) => {
  const attributes = raw.match(/\".*?\"/imgs) || [];
  const transfered = attributes.map(item => [item, item.replace(/(>)/imgs, "\\$1")]);
  transfered.forEach(([searchValue, replaceValue]) => raw = raw.replace(searchValue, replaceValue));
  return raw;
}

const attrRawToMap = (raw: string) => {
  const result = new Map<string, string | boolean>();
  const re = /([^\s]+)\s*?=\s*?((?:\".*?\")|(?:\'.*?\'))/imgs;
  for (const [, key, val] of raw.matchAll(re))
    result.set(key, val);
  for (const [, key] of raw.replace(re, "").matchAll(/\s+([^\s]+)/imgs))
    result.set(key, true);
  return result;
}

const attrMapToRaw = (map: Map<string, string | boolean>) =>
  [...map.entries()].map(([key, val]) => val === true ? `${key}` : `${key}=${val}`).join(" ");

const getAttrVal = (map: Map<string, string | boolean>, key: string) => {
  const val = map.get(key);
  if (typeof val != "string") return undefined;
  return val.replace(/['"]/g, "");
}

export default (): PluginOption => ({
  name: "vite-plugin-vue-template-tag",
  enforce: "pre",
  transform(code, id) {
    if (!id.endsWith(".vue")) return;

    const matches = transferAttribute(code).match(/<template(.*?)(?<!\\)>(.*)<\/template>/ims);
    if (!matches) return;

    let [template, attrRaw, content] = matches;
    attrRaw = attrRaw.replace(/\\>/imgs, ">");
    content = content.replace(/\\>/imgs, ">");

    const attrMap = attrRawToMap(attrRaw);
    const lang = getAttrVal(attrMap, "lang");
    const tag = getAttrVal(attrMap, "tag");
    if (lang && lang != "html" || !tag) return;

    attrMap.delete("lang");
    attrMap.delete("tag");
    attrRaw = attrMapToRaw(attrMap);
    
    return code.replace(template, generate(tag, attrRaw, content));
  }
});