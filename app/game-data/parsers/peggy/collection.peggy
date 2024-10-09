List
  = "(" entities:ListEntries* ")" { return entities[0]; }
  / "" { return []; }

ListEntries
  = head:ListEntry ',' tail:ListEntries { return [head, ...tail]; }
  / head:ListEntry { return [head]; }

ListEntry
  = value:Text { return value; }

Map
  = "(" entities:MapEntries* ")" { return entities[0]; }
  / "" { return []; }

MapEntries
  = head:MapEntry ',' tail:MapEntries { return [head, ...tail]; }
  / head:MapEntry { return [head]; }

MapEntry
  = k:GeneralText "=" v:Text { return [k, v]; }

Text
  = BracketedText
  / GeneralText

BracketedText
  = "(" Text* ")" { return text(); }
  / "(" [^\(\)]+ ")" { return text(); }

GeneralText
  = [ 0-9A-Za-z_\/\\\'\"\.\-:]+ { return text(); }
