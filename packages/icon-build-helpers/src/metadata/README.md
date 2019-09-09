# metadata

- We want to author metadata information that can be used to augment our
  discovery experience for iconography assets
  - Find by name
  - Find by category
  - Find by alias
  - Other fields
- We want a file format that makes it easy to edit this information for both
  technical and non-technical team members
- We want to re-use this strategy for packages we own (icons, pictograms)
  - There may be some information in one package that may not be relevant to the
    other
- At a certain scale, it becomes un-manageable to alter icon information that
  spans multiple icons, like category or alias information, in a single file
  - Originally we had structured our metadata to be nested to help solve this,
    in other words the properties on the top level asset reflected on nested
    variants of that asset (add and add--filled would have same aliases)
  - We've found success creating dedicated files for managing extra information
    like categories or aliases
    - The drawback here is that we now have to do logical checks to verify that
      icons exist in both files, or if one doesn't exist in the other

Our design goals:

- Generate a flat list of iconography assets with inlined metadata information
  alongside top-level information to help with constructing the graph
- Be un-opionated around storage file format (YAML vs TOML vs JSON)
- Have the ability to arrange different types of metadata information that we
  might be interested in
  - For example, icons may want to use categories because of the volume of icons
    but pictograms has no such constraint. We should be able to mix-and-match
    metadata decorators

Here's the idea:

The base file is `metadata.<format>`, where `<format>` depends on what format we
decide to author the file in. How to figure out `<format>`, serialize, and
deserialize it are determined by `adapters`. Similarly, decorators can be loaded

## Topics

- Adapters
  - Why? Allow us to author in different formats
- Decorators

// Sync between files (categories -> metadata.yml) // WHY??? Should happen in
build step

// Format -> in-memory -> Format (YMLAdapter)

// "Decorators" extend metadata // Base format is: { name, friendly_name,
(usage?) } // Adapters: [category, alias, deprecated]

// Files // metadata.yml by default, then <decorator>.yml // metadata.<format>
by default, then <decorator>.<format>
