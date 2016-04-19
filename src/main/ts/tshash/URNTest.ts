import { sha1Urn } from './index';
import { assertEquals } from './testutils';

assertEquals('urn:sha1:SQ5HALIG6NCZTLXB7DNI56PXFFQDDVUZ', sha1Urn('Hello, world!'));
