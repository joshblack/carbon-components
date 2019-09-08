# metadata

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
