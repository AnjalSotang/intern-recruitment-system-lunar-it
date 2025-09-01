import React from 'react'
import { Button } from '@/components/ui/button'
import { Briefcase, CheckCircle, Clock, Plus, Users } from 'lucide-react'



const Header = ({ setShowCreateModal }) => {

    return (

        <section className="flex items-center justify-between">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Internship Positions</h1>
                <p className="text-muted-foreground mt-2">Manage and track all internship positions</p>
            </div>
            <div className="flex items-center gap-2">
                <Button onClick={() => setShowCreateModal(true)}>
                    <Plus className="mr-2 h-4 w-4" />
                    Create Position
                </Button>
            </div>
        </section>

    )
}

export default Header
