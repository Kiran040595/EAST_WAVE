import sharp from 'sharp';
import fs from 'node:fs/promises';
import path from 'node:path';

const mappings = [
 ['Midnight Teal Studio Microphone.png','hero-microphone.webp',1300],
 ['Cinematic Camera Captures a Podcast Interview.png','hero-camera.webp',1100],
 ['Digital Marketing Analytics Workspace.png','digital.webp',900],
 ['Midnight teal studio headphones on console.png','audio.webp',900],
 ['Premium podcast microphone in amber studio.png','podcast.webp',900],
 ['Premium printed merchandise collection.png','merchandise.webp',900],
 ['Walnut and teal podcast studio.png','studio.webp',1600],
 ['Midnight teal stationery with geometric accents.png','portfolio-print.webp',1300],
 ['Teal and Amber Podcast Studio.png','portfolio-podcast.webp',1300],
];
await fs.mkdir('public/images',{recursive:true});
for(const [source,dest,width] of mappings){await sharp(source).resize({width,withoutEnlargement:true}).webp({quality:85}).toFile(path.join('public/images',dest));}
await sharp('logo-page.png').trim({background:'#ffffff',threshold:12}).resize({width:460}).png().toFile('public/images/eastwave-logo.png');
const tiles=[];
for(let i=0;i<mappings.length;i++){const b=await sharp(path.join('public/images',mappings[i][1])).resize(300,200,{fit:'cover'}).png().toBuffer();tiles.push({input:b,left:(i%3)*300,top:Math.floor(i/3)*200});}
await sharp({create:{width:900,height:600,channels:3,background:'#071e23'}}).composite(tiles).png().toFile('asset-contact-sheet.png');
console.log('Prepared '+mappings.length+' photographs and original logo.');

