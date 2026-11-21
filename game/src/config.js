// Game Configuration: 3 Full Rich Scenes for Double Harbour
export const CONFIG = {
  scenes: [
    {
      id: 'harbour_dawn',
      title: 'The Harbour at Dawn',
      subtitle: 'Scene 1 of 3 · Par 1:30',
      parTime: 90,
      totalDifferences: 7,
      differences: [
        { id: 'bird3', x: 220, y: 120, r: 24, name: 'Third flying seagull' },
        { id: 'cloud_drift', x: 390, y: 95, r: 28, name: 'Morning drifting cloud' },
        { id: 'roof_color', x: 232, y: 315, r: 22, name: 'Harbour cottage roof color' },
        { id: 'boat_buoy', x: 508, y: 340, r: 26, name: 'Cargo sailboat vs beacon buoy' },
        { id: 'chimney_smoke', x: 147, y: 275, r: 18, name: 'Cottage chimney stack' },
        { id: 'beach_crate', x: 115, y: 405, r: 20, name: 'Wooden beach cargo crate' },
        { id: 'pier_post', x: 375, y: 415, r: 18, name: 'Mooring bollard post' }
      ]
    },
    {
      id: 'night_market',
      title: 'The Night Market',
      subtitle: 'Scene 2 of 3 · Par 2:00',
      parTime: 120,
      totalDifferences: 6,
      differences: [
        { id: 'lantern_glow', x: 180, y: 110, r: 24, name: 'Neon lantern color' },
        { id: 'cat_stall', x: 320, y: 340, r: 22, name: 'Sleeping tabby cat' },
        { id: 'signboard_neon', x: 450, y: 130, r: 26, name: 'Bazaar neon kanji' },
        { id: 'pot_steam', x: 240, y: 280, r: 20, name: 'Steamer basket steam' },
        { id: 'paper_fan', x: 110, y: 320, r: 18, name: 'Decorative paper fan' },
        { id: 'bunting_flag', x: 360, y: 70, r: 22, name: 'Festival bunting flag' }
      ]
    },
    {
      id: 'coral_reef',
      title: 'The Coral Lagoon',
      subtitle: 'Scene 3 of 3 · Par 2:15',
      parTime: 135,
      totalDifferences: 6,
      differences: [
        { id: 'sea_turtle', x: 150, y: 160, r: 26, name: 'Swimming sea turtle' },
        { id: 'starfish_color', x: 380, y: 420, r: 22, name: 'Coral reef starfish' },
        { id: 'clownfish_stripe', x: 260, y: 290, r: 20, name: 'Anemone clownfish' },
        { id: 'air_bubbles', x: 440, y: 180, r: 24, name: 'Rising bubble stream' },
        { id: 'treasure_chest', x: 120, y: 390, r: 24, name: 'Sunken coin chest' },
        { id: 'purple_coral', x: 490, y: 360, r: 24, name: 'Deep branching coral' }
      ]
    }
  ]
};
