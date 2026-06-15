'use client'

import { useState } from 'react'        
import { createClient } from '@/utils/supabase/client'


export default function ItemGrid() {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-foam rounded-lg shadow p-4">
                <h3 className="text-lg font-semibold text-espresso mb-2">Espresso</h3>
                <p className="text-sm text-caramel">Rich and bold espresso shot.</p>
            </div>
            <div className="bg-foam rounded-lg shadow p-4">
                <h3 className="text-lg font-semibold text-espresso mb-2">Espresso</h3>
                <p className="text-sm text-caramel">Rich and bold espresso shot.</p>
            </div>
            <div className="bg-foam rounded-lg shadow p-4">
                <h3 className="text-lg font-semibold text-espresso mb-2">Espresso</h3>
                <p className="text-sm text-caramel">Rich and bold espresso shot.</p>
            </div>
            <div className="bg-foam rounded-lg shadow p-4">
                <h3 className="text-lg font-semibold text-espresso mb-2">Espresso</h3>
                <p className="text-sm text-caramel">Rich and bold espresso shot.</p>
            </div>
        </div>
    )
}
